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
    classes: {},
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

  _getPathComponents() {
    const { pathConfiguration } = this.state;
    return pathConfiguration.breadcrumbPath.map(
      (index, path) => {
        return this._getPathComponent(path, pathConfiguration.separatorChar, index);
      }
    );
  }

  _getPathComponent(pathObj, separatorChar, index) {
    const { classes } = this.props;
    const classNameContainer = classNames(
      'Breadcrumb-container',
      {
        [classes['Breadcrumb-container']]: !!classes['Breadcrumb-container'],
      }
    );
    const classNameSeparator = classNames(
      'Breadcrumb-separator',
      {
        [classes['Breadcrumb-separator']]: !!classes['Breadcrumb-separator'],
      }
    );

    const classNamePath = classNames(
      'Breadcrumb-path',
      {
        [classes['Breadcrumb-path']]: !!classes['Breadcrumb-path'],
      }
    );
    return (
      <div
        className={classNameContainer}
        key={index}
      >
        <div className={classNameSeparator}>
          {separatorChar}
        </div>
        <div className={classNamePath}>
          <a href={pathObj.path}>
            {pathObj}
          </a>
        </div>
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const classNameParent = classNames(
      'Breadcrumb',
      {
        [className]: !!className,
      }
    );
    return (
      <div className={classNameParent}>
        {this._getPathComponents()}
      </div>
    );
  }
}
