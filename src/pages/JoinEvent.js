import React, { useState, useEffect } from "react";
import "./JoinEvent.css";

const JoinEvent = () => {
  const [step, setStep] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maxTeamSize = 4; // can be dynamic (from event data)

  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    phone: "",
    institution: "",
    members: [{ name: "", email: "" }],
    whyParticipate: "",
    projectLink: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    newMembers[index][field] = value;
    setFormData({ ...formData, members: newMembers });
  };

  const addMember = () => {
    if (formData.members.length < maxTeamSize) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: "", email: "" }],
      });
    } else {
      alert(`Maximum team size is ${maxTeamSize}`);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Successfully registered for the event!");
    console.log("Join Event Form:", formData);
  };

  return (
    <div className="join-event-page">
      <div className="join-event-container">
        <h2 className="join-title">Join Event</h2>

        <div className="event-summary">
          <h3>Hackathon 2025</h3>
          <p>
            Deadline: 30th Aug | Mode: Online | Max Team Size: {maxTeamSize}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h3>Basic Details</h3>
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={formData.teamName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="leaderName"
                placeholder="Leader Name"
                value={formData.leaderName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="leaderEmail"
                placeholder="Leader Email"
                value={formData.leaderEmail}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="institution"
                placeholder="Institution / Company"
                value={formData.institution}
                onChange={handleChange}
              />
              <button type="button" onClick={nextStep} className="form-btn primary">
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Team Members</h3>
              {formData.members.map((member, index) => (
                <div key={index} className="member-inputs">
                  <input
                    type="text"
                    placeholder="Member Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="email"
                    placeholder="Member Email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                  />
                </div>
              ))}

              {/* Only show button if max size not reached */}
              {formData.members.length < maxTeamSize && (
                <button
                  type="button"
                  onClick={addMember}
                  className="form-btn secondary"
                >
                  + Add Member
                </button>
              )}

              <div className="step-buttons">
                <button
                  type="button"
                  onClick={prevStep}
                  className="form-btn secondary"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="form-btn primary"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Additional Questions</h3>
              <textarea
                name="whyParticipate"
                placeholder="Why do you want to participate?"
                value={formData.whyParticipate}
                onChange={handleChange}
                required
              />
              <input
                type="url"
                name="projectLink"
                placeholder="Project / GitHub Link (optional)"
                value={formData.projectLink}
                onChange={handleChange}
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                I agree to the event rules and code of conduct
              </label>
              <div className="step-buttons">
                <button
                  type="button"
                  onClick={prevStep}
                  className="form-btn secondary"
                >
                  ← Back
                </button>
                <button type="submit" className="form-btn primary">
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinEvent;
