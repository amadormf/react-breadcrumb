import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Breadcrumb extends React.Component {
  static propTypes = {
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    separatorChar: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
  };

  static defaultProps = {
    separatorChar: '/',
    classes: {},
    onClick: () => {},
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(path) {
    return (e) => {
      this.props.onClick(e, path);
    };
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
      (path, index) => (this._getPathComponent(path, pathConfiguration.separatorChar, index))
    );
  }

  _getPathComponent(pathObj, separatorChar, index) {
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
      <span
        className={classNameContainer}
        key={index}
      >
        <span className={classNameSeparator}>
          {separatorChar}
        </span>
        <span
          onClick={this.handleClick(pathObj)}
          className={classNamePath}
        >
          {this._getLinkPath(pathObj)}
        </span>
      </span>
    );
  }

  _getLinkPath(pathObj) {
    if (pathObj.path && pathObj.path !== '') {
      return (
        <a href={pathObj.path}>
          {pathObj.label}
        </a>
      );
    }
    return pathObj.label;
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
