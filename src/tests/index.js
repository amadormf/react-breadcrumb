import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumb from '../index';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';

const { describe, it } = global;

chai.use(sinonChai);
chai.use(chaiEnzyme());

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

function getBreadcrumb(path, onClick, className, classes = {}, pathSeparator = '/') {
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
  it('Check simple render', () => {
    const wrapper = getBreadcrumb('/check/path');
    expect(wrapper).to.have.className('Breadcrumb');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-container');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-path');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-separator');
  });
  it('Check if we send a className prop the parent div have this class', () => {
    const wrapper = getBreadcrumb('/check/path', () => {}, 'ClassTest');
    expect(wrapper).to.have.className('Breadcrumb');
    expect(wrapper).to.have.className('ClassTest');
  });
  it('Check if we send a classes prop all items receive the correct class', () => {
    const wrapper = getBreadcrumb('/check/path', () => {}, null, {
      'Breadcrumb-container': 'ClassContainer',
      'Breadcrumb-path': 'ClassPath',
      'Breadcrumb-separator': 'ClassSeparator',
    });
    expect(wrapper).to.have.className('Breadcrumb');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-container .ClassContainer');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-path .ClassPath');
    expect(wrapper).to.have.exactly(2).descendants('.Breadcrumb-separator .ClassSeparator');
  });
  it('Check if render the path correctly', () => {
    const wrapper = getBreadcrumb('/check/path');
    const paths = wrapper.find('.Breadcrumb-path');
    expect(paths.at(0)).to.contain.text('check');
    expect(paths.at(1)).to.contain.text('path');
    expect(paths.at(0)).to.have.descendants('a');
    expect(paths.at(1)).to.have.descendants('a');
    const separators = wrapper.find('.Breadcrumb-separator');
    expect(separators.at(0)).to.contain.text('/');
    expect(separators.at(1)).to.contain.text('/');
  });
  it('If send separatorChar prop, should be render this separator', () => {
    const wrapper = getBreadcrumb('/check/path', () => {}, null, {}, '-');
    const separators = wrapper.find('.Breadcrumb-separator');
    expect(separators.at(0)).to.contain.text('-');
    expect(separators.at(1)).to.contain.text('-');
  });
  it('If in a custom path, don\'t send a path shouldn\'t render link', () => {
    const wrapper = getBreadcrumb([
      {
        label: 'check',
        path: '/check',
      },
      {
        label: 'path',
        path: '/check/path',
      },
      {
        label: 'empty',
      },
    ]);
    const paths = wrapper.find('.Breadcrumb-path');
    expect(paths.at(0)).to.contain.text('check');
    expect(paths.at(1)).to.contain.text('path');
    expect(paths.at(2)).to.contain.text('empty');
    expect(paths.at(2)).to.not.have.descendants('a');
  });
});

describe('Actions', () => {
  it('If we click in a path should call to onClick prop with the correct path', () => {
    const click = sinon.spy();
    const wrapper = getBreadcrumb('/check/path', click);
    wrapper.find('.Breadcrumb-path').at(0).simulate('click');
    expect(click).to.be.callCount(1);
    expect(click).have.been.calledWithMatch(
      undefined,
      {
        path: '/check',
        label: 'check',
      }
    );

    click.reset();

    wrapper.find('.Breadcrumb-path').at(1).simulate('click');
    expect(click).to.be.callCount(1);
    expect(click).have.been.calledWithMatch(
      undefined,
      {
        path: '/check/path',
        label: 'path',
      }
    );
  });
});
