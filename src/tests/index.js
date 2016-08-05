import React from 'react';
import { shallow, mount } from 'enzyme';
import Breadcrumb from '../index';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const { describe, it } = global;

chai.use(sinonChai);

const breadcrumbPath = [
  {
    label: 'check',
    path: '/check',
  },
  {
    label: 'path',
    path: '/check/path',
  },
];

function getBreadcrumb(path, onClick, className, classes, pathSeparator = '/') {
  return shallow(
    <Breadcrumb
      path={path}
      onClick={onClick}
      className={className}
      classes={classes}
      separatorChar={pathSeparator}
    />
  );
}

describe('Check path props is processed correctly', () => {
  it('If send a string', () => {
    const wrapper = getBreadcrumb('/check/path');
    expect(wrapper.state('pathConfiguration')).to.deep.equal({
      separatorChar: '/',
      breadcrumbPath,
    });
  });
  it('If send an object', () => {
    const wrapper = getBreadcrumb(breadcrumbPath);
    expect(wrapper.state('pathConfiguration')).to.deep.equal({
      separatorChar: '/',
      breadcrumbPath,
    });
  });
  it('If change path props rebuild pathConfiguration', () => {
    const wrapper = getBreadcrumb('/check/another/path');
    wrapper.setProps({
      path: '/check/path',
    });
    expect(wrapper.state('pathConfiguration')).to.deep.equal({
      separatorChar: '/',
      breadcrumbPath,
    });
  });
});

describe('Render and className', () => {
  it('Check simple render');
  it('Check if we send a className prop the parent div have this class');
  it('Check if we send a classes prop all items receive the correct class');
  it('Check if render the path correctly');
});

describe('Actions', () => {
  it('If we click in a path should call to onClick prop with the correct path');
});
