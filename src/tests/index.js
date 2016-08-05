import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '../index';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const { describe, it } = global;

chai.use(sinonChai);

describe('Button', () => {
  it('should show the given text', () => {
    const text = 'The Text';
    const wrapper = shallow(<Button>{text}</Button>);
    expect(wrapper.text()).to.be.equal(text);
  });

  it('should handle the click event', () => {
    const clickMe = sinon.stub();
    // Here we do a JSDOM render. So, that's why we need to
    // wrap this with a div.
    const wrapper = mount(
      <div>
        <Button onClick={ clickMe }>ClickMe</Button>
      </div>
    );

    wrapper.find('button').simulate('click');
    expect(clickMe.callCount).to.be.equal(1);
  });
});
