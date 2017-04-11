import React from 'react';
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu';

const MoreTags = ({tags, onTagClick, theme}) => (
  <IconMenu icon={<span>more tags</span>} position='topLeft' menuRipple>
    {tags.map(tag =>
      <MenuItem key={tag} value={tag} caption={tag} onClick={onTagClick} />
    )}
  </IconMenu>
);

export default MoreTags;
