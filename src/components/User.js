// ...existing code...
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getAllUsers } from '../redux/userSlice';

export default function User() {
  const dispatch = useDispatch();
  const { status, data, error, list, listStatus } = useSelector((s) => s.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');

  const handleCreate = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhno = String(phno).trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhno) {
      console.warn('Please provide name, email and phone number');
      return;
    }

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phno: Number(trimmedPhno),
    };

    console.log('dispatching createUser', payload);
    dispatch(createUser(payload))
      .unwrap()
      .then((res) => {
        console.log('createUser success ->', res);
      })
      .catch((err) => {
        console.warn('createUser failed ->', err);
      });
  };

  const handleLoadUsers = () => {
    console.log('dispatching getAllUsers');
    dispatch(getAllUsers())
      .unwrap()
      .then((res) => console.log('getAllUsers success ->', res))
      .catch((err) => console.warn('getAllUsers failed ->', err));
  };

  return (
    <div className="p-3">
      <h3>User</h3>

      <div className="mb-2">
        <label>Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div className="mb-2">
        <label>Email</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>

      <div className="mb-2">
        <label>Phone</label>
        <input
          className="form-control"
          value={phno}
          onChange={(e) => setPhno(e.target.value)}
          placeholder="Phone number"
          type="tel"
        />
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Creating...' : 'Save'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleLoadUsers}
          disabled={listStatus === 'pending'}
        >
          {listStatus === 'pending' ? 'Loading...' : 'Load users'}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div><strong>Status:</strong> {status}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        {Array.isArray(list) && list.length > 0 ? (
          <div className="row">
            {list.map((u, idx) => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={u.id ?? idx}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{u.name || '—'}</h5>
                    <p className="card-text mb-1"><strong>Email:</strong> {u.email || '—'}</p>
                    <p className="card-text"><strong>Phone:</strong> {u.phno ?? '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No users loaded</div>
        )}
      </div>
    </div>
  );
}