import ReactDOM from 'react-dom';

function Portal({ children, node = window.document.body }) {
  if (children) {
    return ReactDOM.createPortal(
      children,
      node,
    );
  }
  return null;
}

export default Portal;
