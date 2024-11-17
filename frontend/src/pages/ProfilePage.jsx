import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


import { Button } from "@components";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

export const ProfilePage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo])

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await updateUser({
        _id: userInfo._id,
        name: name,
        email: email,
        password: password
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className='min-h-[69vh] w-full mt-20 p-10'>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
          <h2 className="mb-5 text-4xl font-bold text-purple-500">Update Profile</h2>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium ">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium ">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={formSubmissionHandler} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </section >
  )
}
