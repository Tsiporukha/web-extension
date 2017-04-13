import React from 'react';
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu';

const iconLabel = <a><span>More Tags</span><i className='material-icons'>more_horiz</i></a>;

const MoreTags = ({tags, onTagClick, theme}) => (
  <IconMenu
    icon={iconLabel}
    theme={theme}
    position='topLeft'
    menuRipple >
    {tags.map(tag =>
      <MenuItem key={tag} theme={theme} value={tag} caption={tag} onClick={onTagClick} />
    )}
  </IconMenu>
);

export default MoreTags;
