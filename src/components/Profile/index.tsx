import { FC } from 'react';


// Define the interface to define the component props
interface ProfileProps {
    profileData: {
        name: string;
        email: string;
    };
}

export const Profile: FC<ProfileProps> = ({ profileData }) => {

    return (
        <div className = 'profile'>
            <h1>Profile</h1>
            <div>{ profileData.name }</div>
            <div>{ profileData.email }</div>
        </div>
    );
}
