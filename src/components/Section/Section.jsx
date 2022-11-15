import PropTypes from 'prop-types';

const Section = ({ header, title, children }) => {
  return (
    <>
      {header && <h1>{header}</h1>}
      {title && <h2>{title}</h2>}

      {children}
    </>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
