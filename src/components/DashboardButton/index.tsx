import { FC } from "react";

interface DashboardButtonProps {
    onClick: () => void;
}

export const DashboardButton: FC<DashboardButtonProps> = ({ onClick }) => {
    return (
        <div className = 'controls'>
            <button onClick = { onClick } className = 'button-create-task'>
                <i className = 'las'></i>
                Новая задача
            </button>
        </div>
    );
}
