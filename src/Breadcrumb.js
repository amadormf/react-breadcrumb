import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Breadcrumb extends React.Component {
  static propTypes = {
    path: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]).isRequired,
    pathSeparator: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    classes: React.PropTypes.object,
  };

  static defaultProps = {
    pathSeparator: '/',
  }

  constructor(props) {
    super(props);
    this._bindFunctions();
    this.state = {
      pathConfiguration: this._buildPath(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pathConfiguration: this._buildPath(nextProps),
    });
  }

  _bindFunctions() {

  }

  _buildPath(props) {
    if (typeof props.path === 'string') {
      return this._buildPathForString(props);
    }
    return this._buildPathForArray(props);
  }

  _buildPathForString(props) {
    const pathConfiguration = {
      separatorChar: props.separatorChar,
      breadcrumbPath: [],
    };

    const pathSections = props.path.split('/');
    let accumulatePath = '';
    for (const path of pathSections) {
      if (path && path !== '') {
        accumulatePath += `/${path}`;
        pathConfiguration.breadcrumbPath.push({
          label: path,
          path: accumulatePath,
        });
      }
    }
    return pathConfiguration;
  }

  _buildPathForArray(props) {
    return {
      separatorChar: props.separatorChar,
      breadcrumbPath: props.path,
    };
  }
  render() {
    return (
      <div>
        hello
      </div>
    );
  }
}
