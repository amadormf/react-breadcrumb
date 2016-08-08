import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Breadcrumb from '../index';

function handleClick(e, path) {
  e.preventDefault();
  e.stopPropagation();
  action()(path);
}

const pathObject = [
  {
    label: 'check',
    path: '/path-to-check',
  },
  {
    label: 'path',
    path: '/path-to-path',
  },
];

storiesOf('Button', module)
  .add('Path with string', () => (
    <Breadcrumb
      path="path/to/test"
      onClick={handleClick}
    />
  ))
  .add('Path with object', () => (
    <div>
      <Breadcrumb
        path={pathObject}
        onClick={handleClick}
      />
      <div
        style={
          {
            marginTop: '1em',
          }
        }
      >
        path =
      </div>
      <pre
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pathObject, null, 2) }}
        style={
          {
            marginLeft: '1em',
            marginTop: 0,
          }
        }
      />
    </div>
  ));
