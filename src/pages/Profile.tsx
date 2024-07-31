import { FC, useEffect, useState } from 'react';
import { Profile } from '../components/Profile';
import { api } from '../api';
import { ProfileInfo } from '../types/types';

export const ProfilePage: FC = () => {
    const [profileData, setProfileData] = useState<ProfileInfo>();

    const fetchProfile = async () => {
        const profile = await api.auth.profile();

        setProfileData(profile);
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <>
            { profileData ? <Profile profileData = { profileData } /> :  <p>Loading... </p> }
        </>
    );
}
