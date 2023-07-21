// idk whats wrong w this document idk if the event listener is attaching?

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/listings/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// cant find this event listener in devtools
document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
