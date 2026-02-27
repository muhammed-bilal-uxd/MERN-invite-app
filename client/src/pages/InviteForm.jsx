import { useState } from "react";
import axios from "axios";

export default function InviteForm() {
  const [form, setForm] = useState({
    organizationName: "",
    userName: "",
    workEmail: "",
    password: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/invite`,
        form,
        { headers: { "Content-Type": "application/json" } },
      );
      setMsg(data.message || "Saved!");
      setForm({
        organizationName: "",
        userName: "",
        workEmail: "",
        password: "",
        country: "",
      });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui",
      }}
    >
      <h2>Invite Form</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          name="organizationName"
          value={form.organizationName}
          onChange={onChange}
          placeholder="Organization Name"
          required
        />
        <input
          name="userName"
          value={form.userName}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <input
          name="workEmail"
          type="email"
          value={form.workEmail}
          onChange={onChange}
          placeholder="Work Email ID"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password (min 8 chars)"
          required
        />
        <input
          name="country"
          value={form.country}
          onChange={onChange}
          placeholder="Country"
          required
        />

        <button disabled={loading} type="submit">
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
