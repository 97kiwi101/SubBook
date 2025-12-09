import { useState, useEffect } from 'react';
// Import the new retractShift function
import { getAvailableShifts, getMyShifts, createShift, releaseShift, retractShift, coverShift } from '../api/shifts';

function Dashboard({ user, setUser }) {
  const [availableShifts, setAvailableShifts] = useState([]);
  const [myShifts, setMyShifts] = useState([]);
  
  const [formData, setFormData] = useState({
    dateRaw: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    jobType: 'Monitor' // Default value matching the dropdown
  });

  useEffect(() => {
    refreshData();
  }, [user]);

  const refreshData = async () => {
    if (!user) return;
    try {
      const [available, mine] = await Promise.all([
        getAvailableShifts(),
        getMyShifts(user.email)
      ]);
      setAvailableShifts(available);
      setMyShifts(mine);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, min] = timeStr.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12; 
    return `${h12}:${min} ${ampm}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleCreateShift = async (e) => {
    e.preventDefault();
    if(!formData.dateRaw || !formData.startTime || !formData.endTime) {
      alert("Date, Start Time, and End Time are required!");
      return;
    }

    const formattedDay = formatDate(formData.dateRaw);
    const formattedHours = `${formatTime(formData.startTime)} - ${formatTime(formData.endTime)}`;

    try {
      await createShift({
        day: formattedDay,
        hours: formattedHours,
        location: formData.location,
        description: formData.description,
        jobType: formData.jobType,
        userid: user.email, 
        postedBy: user.name
      });
      
      setFormData({ dateRaw: '', startTime: '', endTime: '', location: '', description: '', jobType: 'Monitor' });
      refreshData();
      alert("Shift Created Successfully!");
    } catch (err) {
      alert("Failed to create shift");
      console.error(err);
    }
  };

  // [UPDATED] Post Logic with Optional Reason
  const handlePostSub = async (shiftId) => {
    // 1. Ask for reason
    const reason = prompt("Optional: Reason for posting (e.g., Sick, Exam)?");
    if (reason === null) return; // User clicked Cancel

    await releaseShift(shiftId, reason); // Send reason to backend
    refreshData();
  };

  // [NEW] Retract Logic
  const handleRetractSub = async (shiftId) => {
    if (!confirm('Take this shift back? It will be removed from the sub book.')) return;
    await retractShift(shiftId);
    refreshData();
  };

  const handleTakeShift = async (shiftId) => {
    if (!confirm('Take this shift?')) return;
    await coverShift({ shiftId, userEmail: user.email });
    refreshData();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <div>
      <header>
        <div className="header-logo"><h2>PaperCut MF</h2></div>
        <div className="user-info">
          <span>{user.name}</span>
          <a onClick={handleLogout}>Log out</a>
        </div>
      </header>

      <div className="container">
        <div className="sidebar">
          <ul>
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">My Schedule</a></li>
          </ul>
        </div>

        <div className="main-content">
          <h1>Dashboard</h1>

          <div className="stats-row">
            <div className="widget">
              <h4>My Shifts</h4>
              <div className="val">{myShifts.length}</div>
            </div>
            <div className="widget">
              <h4>Needs Cover</h4>
              <div className="val" style={{ color: '#d9534f' }}>{availableShifts.length}</div>
            </div>
          </div>

          {/* --- MY SHIFTS --- */}
          <h2>My Upcoming Shifts</h2>
          <div className="widget" style={{ padding: 0, marginBottom: '30px' }}>
            {myShifts.length === 0 ? <p style={{padding:'20px'}}>No shifts.</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Hours</th>
                    <th>Job</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myShifts.map((shift) => (
                    <tr key={shift._id}>
                      <td><strong>{shift.day}</strong></td>
                      <td>
                        {shift.hours}
                        <div style={{fontSize:'11px', color:'#777'}}>{shift.description}</div>
                      </td>
                      <td>{shift.jobType}</td>
                      <td>
                        {shift.NeedsToBeCovered ? 
                          <span style={{color:'orange', fontWeight:'bold'}}>POSTED</span> : 
                          <span style={{color:'green'}}>Scheduled</span>
                        }
                      </td>
                      <td>
                        {shift.NeedsToBeCovered ? (
                          // [NEW] Button to take it back
                          <button 
                            className="btn-take" 
                            style={{ backgroundColor: '#666' }} // Grey button for "Undo"
                            onClick={() => handleRetractSub(shift._id)}
                          >
                            Take Back
                          </button>
                        ) : (
                          // Standard Post button
                          <button 
                            className="btn-take" 
                            style={{ backgroundColor: '#d9534f' }}
                            onClick={() => handlePostSub(shift._id)}
                          >
                            Post Sub
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* --- AVAILABLE SHIFTS --- */}
          <h2>Available Shifts (Sub Book)</h2>
          <div className="widget" style={{ padding: 0 }}>
            {availableShifts.length === 0 ? <p style={{padding:'20px'}}>No shifts available.</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Hours</th>
                    <th>Job</th>
                    <th>Reason</th> {/* New Column */}
                    <th>Posted By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableShifts.map((shift) => (
                    shift.userid !== user.email && (
                      <tr key={shift._id}>
                        <td><strong>{shift.day}</strong></td>
                        <td>
                           {shift.hours}
                           <div style={{fontSize:'11px', color:'#777'}}>{shift.location}</div>
                        </td>
                        <td>{shift.jobType}</td>
                        {/* Display Reason if it exists */}
                        <td style={{fontStyle:'italic', color:'#555'}}>
                            {shift.postingReason || '--'}
                        </td>
                        <td>{shift.userid}</td>
                        <td>
                          <button className="btn-take" onClick={() => handleTakeShift(shift._id)}>Take Shift</button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* --- ADMIN FORM --- */}
          <h2 style={{marginTop: '40px', borderTop: '1px solid #ccc', paddingTop:'20px'}}>
            Admin: Create New Shift
          </h2>
          <div className="widget">
            <form onSubmit={handleCreateShift} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Date *</label>
                <input type="date" name="dateRaw" value={formData.dateRaw} onChange={handleInputChange} required style={{ width: '100%', padding: '10px' }} />
              </div>

              <div className="form-group">
                <label>Start Time *</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required style={{ width: '100%', padding: '10px' }} />
              </div>

              <div className="form-group">
                <label>End Time *</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required style={{ width: '100%', padding: '10px' }} />
              </div>

              {/* [NEW] Job Type Dropdown */}
              <div className="form-group">
                <label>Job Type</label>
                <select 
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', background:'white', border:'1px solid #ccc' }}
                >
                    <option value="Monitor">Monitor</option>
                    <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input name="location" placeholder="e.g. Front Desk" value={formData.location} onChange={handleInputChange} />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Description</label>
                <input name="description" placeholder="Notes..." value={formData.description} onChange={handleInputChange} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn-take" style={{ width: '100%', padding: '12px' }}>Create Shift</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;