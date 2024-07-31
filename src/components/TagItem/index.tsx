import { FC } from "react";
import { Tag } from "../../types/types";

interface TagItemProps {
    tag: Tag;
    selected: boolean;
    onClick: (tag: Tag) => void;
}

export const TagItem: FC<TagItemProps> = ({ tag, selected, onClick }) => {
    return (
        <span className = { `tag ${selected ? 'selected' : '' }` }
            onClick = { () => onClick(tag) }
            style = { { color: tag.color, backgroundColor: tag.bg } }>
            { tag.name }
        </span>
    );
}
