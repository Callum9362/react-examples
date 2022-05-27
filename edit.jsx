import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';

import AppLayout from '@/components/Layouts/AppLayout';

const EditProfile = () =>
{
    const { user } = useAuth({ middleware: 'auth' });

    const [profileId, setProfileId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [interests, setInterests] = useState('');
    const [pronoun, setPronoun] = useState('');
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const editProfile = async event =>
    {
        event.preventDefault();

        await csrf();

        axios
            .post(`/api/profile/edit/${profileId}`, {
                'first_name': firstName,
                'last_name': lastName,
                'bio': bio,
                'location': location,
                'interests': interests,
                'pronoun': pronoun,
                'website': website,
                'twitter': twitter,
            })
            .then(({ data }) =>
            {
                if (data.status === 'success')
                {
                    window.location = window.location;
                    return;
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(async () =>
    {
        const username = user?.username;
        if (typeof username === 'undefined')
        {
            return;
        }
        const result = await fetch(`http://localhost:8000/api/profile/${username}`);
        const profile = await result.json();

        setProfileId(profile.id);
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setBio(profile.bio);
        setLocation(profile.location);
        setInterests(profile.interests);
        setPronoun(profile.pronoun);
        setWebsite(profile.website);
        setTwitter(profile.twitter);
    }, [user])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit My Profile
                </h2>
            }>

            <Head>
                <title>Edit My Profile</title>
            </Head>

            <div className="mt-5 self-center w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md content-center rounded">
                <form onSubmit={editProfile}>
                    <div className="rounded shadow p-6">

                        {/* First Name */}
                        <div className="pb-6 flex">
                            <label htmlFor="first-name" className="font-semibold text-gray-700 w-1/5 pt-3">First Name</label>
                            <input id="first-name"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                        </div>

                        {/* Last Name */}
                        <div className="pb-6 flex">
                            <label htmlFor="last-name" className="font-semibold text-gray-700 w-1/5 pt-3">Last Name</label>
                            <input id="last-name"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)} />
                        </div>

                        {/* Bio */}
                        <div className="pb-6 flex">
                            <label htmlFor="bio" className="font-semibold text-gray-700 w-1/5 pt-3">Bio</label>
                            <textarea id="bio"
                                rows={4}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                value={bio}
                                onChange={e => setBio(e.target.value)} />
                        </div>

                        {/* Location */}
                        <div className="pb-6 flex">
                            <label htmlFor="location" className="font-semibold text-gray-700 w-1/5 pt-3">Location</label>
                            <input id="location"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)} />
                        </div>

                        {/* Interests */}
                        <div className="pb-6 flex">
                            <label htmlFor="interests" className="font-semibold text-gray-700 w-1/5 pt-3">Interests</label>
                            <input id="interests"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={interests}
                                onChange={e => setInterests(e.target.value)} />
                        </div>

                        {/* Pronoun */}
                        <div className="pb-6 flex">
                            <label htmlFor="pronoun" className="font-semibold text-gray-700 w-1/5 pt-3">Pronoun</label>
                            <input id="pronoun"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={pronoun}
                                onChange={e => setPronoun(e.target.value)} />
                        </div>

                        {/* Website */}
                        <div className="pb-6 flex">
                            <label htmlFor="website" className="font-semibold text-gray-700 w-1/5 pt-3">Website</label>
                            <input id="website"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text"
                                value={website}
                                onChange={e => setWebsite(e.target.value)} />
                        </div>

                        {/* Twitter */}
                        <div className="pb-6 flex">
                            <label htmlFor="twitter" className="font-semibold text-gray-700 w-1/5 pt-3">Twitter</label>
                            <input id="twitter"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                type="text" value={twitter}
                                onChange={e => setTwitter(e.target.value)} />
                        </div>

                    </div>
                    <button type="submit"
                        className="mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-auto block">Save Changes</button>
                </form>
            </div>
        </AppLayout>
    )
}

export default EditProfile;