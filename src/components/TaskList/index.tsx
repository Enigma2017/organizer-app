import { FC } from 'react';

export const TaskList: FC = () => {
    return (
        <div className = 'list'>
            <div className = 'tasks'>
                <div className = 'task completed'>
                    <span className = 'title'></span>
                    <div className = 'meta'>
                        <span className = 'deadline'></span>
                        <span className = 'tag' 
                            style = {{ color: 'rgb(109, 210, 48)', backgroundColor: 'rgb(245, 253, 240)' }}>
                            Spotify
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
