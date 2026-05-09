import React, { useEffect, useMemo, useState } from "react";

const AUTH_KEY = "mathsClubUser";
const SESSION_KEY = "mathsClubSession";

const pages = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "results", label: "Results" }
];

// Edit About Us names here.
const aboutPeople = {
  coordinators: [
    { label: "Faculty Coordinator", name: "Dr. Pranjali Kekre" },
    { label: "Faculty Coordinator", name: "Mrs. Priyanka Sisodiya" }
  ],
  founders: [
    { label: "Founder", name: "Founder Name" },
    { label: "Co-Founder", name: "Co-Founder Name" }
  ],
  leaders: [
    { label: "President", name: "Radhe Tare" },
    { label: "Vice President", name: "Jeshika Khard" }
  ]
};

// Edit team head names here.
const teamData = [
  { team: "Technical Team", head: "Rishi Porwal" },
  { team: "Management Team", head: "Labdhi Vohra" },
  { team: "Content Team", head: "Saloni Tiwari" },
  { team: "PR Team", head: "Somya Sharma" },
  { team: "Video Editing Team", head: "Jiya Patel" },
  { team: "Graphical Team", head: "Sudarshan Dongre" }
];

// Add your real social links here.
const socialLinks = {
  instagram: "https://www.instagram.com/medicaps_mathsclub?igsh=MWhiMWF0bzJ2MDN0ag==",
  facebook: "https://www.facebook.com",
  youtube: "https://www.youtube.com",
  linkedin: "https://www.linkedin.com"
};

const events = ["Equation - X", "What If", "The Chamber of Secrets"];

function imageFromFile(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function Header({ user, page, setPage, onLogout, onEdit }) {
  const [open, setOpen] = useState(false);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "MC";

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => setPage("home")}>
        <img src="/club-symbol.jpg" alt="Maths Club symbol" />
        <span>Maths Club</span>
      </button>
      <nav className="nav-links" aria-label="Main navigation">
        {pages.map((item) => (
          <button
            className={page === item.id ? "active" : ""}
            key={item.id}
            type="button"
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="user-menu">
        <button
          className="user-avatar"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="User menu"
        >
          {user?.photo ? <img src={user.photo} alt="" /> : initials}
        </button>
        {open && (
          <div className="user-popover">
            <strong>{user?.name || "Maths Club User"}</strong>
            <span>{user?.email}</span>
            <button type="button" onClick={onEdit}>
              Edit Profile
            </button>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/club-symbol.jpg" alt="Maths Club symbol" />
        <div>
          <strong>Maths Club</strong>
          <p>Explore logic, problem solving, competitions, and teamwork.</p>
        </div>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        {pages.map((item) => (
          <button key={item.id} type="button" onClick={() => setPage(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="social-links" aria-label="Social media links">
        <a href={socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
        </a>
        <a href={socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" /></svg>
        </a>
        <a href={socialLinks.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><path d="M21 8.5a3 3 0 0 0-2.1-2.1C17 6 12 6 12 6s-5 0-6.9.4A3 3 0 0 0 3 8.5 31 31 0 0 0 3 15.5a3 3 0 0 0 2.1 2.1C7 18 12 18 12 18s5 0 6.9-.4A3 3 0 0 0 21 15.5a31 31 0 0 0 0-7Z" /><path d="m10 9 5 3-5 3Z" /></svg>
        </a>
        <a href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24"><path d="M6.5 10H3v11h3.5V10Z" /><path d="M4.8 8a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" /><path d="M21 15c0-3.4-1.8-5.3-4.5-5.3-1.7 0-2.7.9-3.2 1.7V10H10v11h3.5v-5.7c0-1.5.8-2.4 2-2.4 1.1 0 2 .8 2 2.4V21H21v-6Z" /></svg>
        </a>
      </div>
    </footer>
  );
}

function AuthPage({ mode, setMode, onLogin, onRegister }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    enrollment: "",
    scholar: "",
    gender: "",
    program: "",
    academicYear: "",
    batch: "2025",
    address: ""
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    setError("");

    if (mode === "login") {
      const saved = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
      if (!saved) {
        setError("Please register first, then log in.");
        return;
      }
      if (saved.email !== form.email || saved.password !== form.password) {
        setError("Email or password is incorrect.");
        return;
      }
      onLogin(saved);
      return;
    }

    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }
    onRegister(form);
  }

  if (mode === "login") {
    return (
      <main className="auth-shell">
        <form className="auth-card" onSubmit={submit}>
          <h1>Maths Club Login</h1>
          <p>Welcome back. Enter your credentials to access the club portal.</p>
          {error && <div className="form-error">{error}</div>}
          <label><span>Email</span><input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" required /></label>
          <label><span>Password</span><input value={form.password} onChange={(e) => update("password", e.target.value)} type="password" required /></label>
          <button className="button primary" type="submit">Log In</button>
          <p className="form-link">Not registered yet? <button type="button" onClick={() => setMode("register")}>Sign up here</button></p>
        </form>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <form className="auth-card wide" onSubmit={submit}>
        <h1>Maths Club Registration</h1>
        <p>Please fill in your academic and personal details below to become a member.</p>
        {error && <div className="form-error">{error}</div>}
        <div className="form-grid">
          <label><span>Name</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required /></label>
          <label><span>Phone No.</span><input value={form.phone} onChange={(e) => update("phone", e.target.value)} required /></label>
          <label><span>Email</span><input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" required /></label>
          <label><span>Password</span><input value={form.password} onChange={(e) => update("password", e.target.value)} type="password" required /></label>
          <label><span>Enrollment Number</span><input value={form.enrollment} onChange={(e) => update("enrollment", e.target.value)} /></label>
          <label><span>Scholar Number</span><input value={form.scholar} onChange={(e) => update("scholar", e.target.value)} /></label>
          <label><span>Gender</span><select value={form.gender} onChange={(e) => update("gender", e.target.value)}><option value="">Select Gender</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label>
          <label><span>Program</span><select value={form.program} onChange={(e) => update("program", e.target.value)}><option value="">Select Program</option><option>B.Tech</option><option>B.C.A</option><option>B.B.A</option><option>M.Tech</option><option>M.C.A</option><option>M.B.A</option></select></label>
          <label><span>Academic Year</span><select value={form.academicYear} onChange={(e) => update("academicYear", e.target.value)}><option value="">Select Year</option><option>First Year</option><option>Second Year</option><option>Third Year</option><option>Fourth Year</option></select></label>
          <label><span>Batch (Year of Entry)</span><select value={form.batch} onChange={(e) => update("batch", e.target.value)}><option>2026</option><option>2025</option><option>2024</option><option>2023</option></select></label>
          <label className="full"><span>Address</span><textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows="3" /></label>
        </div>
        <button className="button primary violet" type="submit">Submit Registration</button>
        <p className="form-link">Already registered? <button type="button" onClick={() => setMode("login")}>Log in here</button></p>
      </form>
    </main>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Maths Club</h1>
          <h2>Welcome to the Club!</h2>
          <p>"Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding."</p>
        </div>
        <div className="hero-panel symbol-panel">
          <img src="/club-symbol.jpg" alt="Maths Club symbol" />
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">What We Do</p>
          <h2>Think clearly. Solve boldly.</h2>
          <p>Maths Club helps students build confidence with mathematical ideas through practice, teamwork, creative explanation, and competition.</p>
        </div>
        <div className="feature-grid">
          <article><span>01</span><h3>Problem Solving</h3><p>Weekly practice with logic puzzles, olympiad-style questions, and collaborative challenges.</p></article>
          <article><span>02</span><h3>Competitions</h3><p>Preparation for school contests, regional events, and team-based maths tournaments.</p></article>
          <article><span>03</span><h3>Peer Learning</h3><p>Students explain methods, compare strategies, and build confidence with mathematical ideas.</p></article>
        </div>
      </section>
      <section className="section events-section">
        <div className="section-heading">
          <p className="eyebrow">Events Done</p>
          <h2>2025 Events</h2>
          <p>Add event photos and write a short note about each activity.</p>
        </div>
        <div className="events-grid">
          {events.map((eventName) => <EventCard key={eventName} name={eventName} />)}
        </div>
      </section>
    </>
  );
}

function EventCard({ name }) {
  const [photo, setPhoto] = useState("/club-symbol.jpg");
  return (
    <article className="event-card">
      <label className="event-photo">
        <img src={photo} alt={`${name} event preview`} />
        <input type="file" accept="image/*" onChange={(e) => imageFromFile(e.target.files[0], setPhoto)} />
      </label>
      <div className="event-content">
        <h3>{name}</h3>
        <label><span>Event Details</span><textarea rows="5" placeholder={`Write about ${name} here...`} /></label>
      </div>
    </article>
  );
}

function PersonCard({ label = "Member", name }) {
  const [photo, setPhoto] = useState("/club-symbol.jpg");
  return (
    <article className="person-card">
      <label className="avatar-uploader">
        <img src={photo} alt={`${label} preview`} />
        <input type="file" accept="image/*" onChange={(e) => imageFromFile(e.target.files[0], setPhoto)} />
      </label>
      <label><span>{label} Name</span><input defaultValue={name} /></label>
    </article>
  );
}

function About() {
  return (
    <section className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">About Us</p>
        <h2>Club People & Teams</h2>
      </div>
      <div className="people-block">
        <h3>Faculty Coordinator</h3>
        <div className="people-grid">
          {aboutPeople.coordinators.map((person) => (
            <PersonCard key={person.name} {...person} />
          ))}
        </div>
      </div>
      <div className="people-block">
        <h3>Founders</h3>
        <div className="people-grid">
          {aboutPeople.founders.map((person) => (
            <PersonCard key={person.label} {...person} />
          ))}
        </div>
      </div>
      <div className="people-block">
        <h3>Club Leaders</h3>
        <div className="people-grid">
          {aboutPeople.leaders.map((person) => (
            <PersonCard key={person.label} {...person} />
          ))}
        </div>
      </div>
      <div className="people-block">
        <h3>Maths Club Teams</h3>
        <div className="team-grid">
          {teamData.map((team) => <TeamCard key={team.team} {...team} />)}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ team, head }) {
  const [photo, setPhoto] = useState("/club-symbol.jpg");
  return (
    <article className="team-card">
      <label className="avatar-uploader small">
        <img src={photo} alt={`${team} head preview`} />
        <input type="file" accept="image/*" onChange={(e) => imageFromFile(e.target.files[0], setPhoto)} />
      </label>
      <div>
        <h4>{team}</h4>
        <label><span>Head Name</span><input defaultValue={head} /></label>
      </div>
    </article>
  );
}

function Results() {
  return (
    <section className="section results-section">
      <div className="section-heading">
        <p className="eyebrow">Regional Results</p>
        <h2>2025 Regional Results</h2>
        
      </div>
      <div className="results-grid">
        <div><h3>EquationX Events</h3><ul><li>Decode</li><li>Debug</li><li>Discover</li></ul></div>
        <div><h3>What-If 2.0 Events</h3><ul><li>The strongest correct answer wins</li><li>Think fast Answer smart</li></ul></div>
      </div>
    </section>
  );
}

function EditProfileModal({ user, onClose, onSave }) {
  const [draft, setDraft] = useState(user);
  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
        <h2>Edit Profile</h2>
        <label className="profile-photo">
          {draft.photo ? <img src={draft.photo} alt="" /> : <span>Upload</span>}
          <input type="file" accept="image/*" onChange={(e) => imageFromFile(e.target.files[0], (photo) => setDraft({ ...draft, photo }))} />
        </label>
        <label><span>Name</span><input value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
        <label><span>Email</span><input value={draft.email || ""} onChange={(e) => setDraft({ ...draft, email: e.target.value })} type="email" /></label>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="button primary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(SESSION_KEY) || "null"));
  const [page, setPage] = useState("home");
  const [editing, setEditing] = useState(false);

  const content = useMemo(() => {
    if (page === "about") return <About />;
    if (page === "results") return <Results />;
    return <Home />;
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  function login(nextUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setPage("home");
  }

  function register(nextUser) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    login(nextUser);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setAuthMode("login");
  }

  function saveProfile(nextUser) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setEditing(false);
  }

  if (!user) {
    return <AuthPage mode={authMode} setMode={setAuthMode} onLogin={login} onRegister={register} />;
  }

  return (
    <div className="app-shell">
      <Header user={user} page={page} setPage={setPage} onLogout={logout} onEdit={() => setEditing(true)} />
      <main className="page-shell">{content}</main>
      <Footer setPage={setPage} />
      {editing && <EditProfileModal user={user} onClose={() => setEditing(false)} onSave={saveProfile} />}
    </div>
  );
}
