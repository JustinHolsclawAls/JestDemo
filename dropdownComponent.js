/*README
  To use the selection modify the on valid select
*/

// dropdownComponent.js
export function createSearchableDropdown({
  options = [],
  placeholder = 'Select an option',
  // onValidSelect = (value) => {},
  className = ''
}) {
  // Container div
  const container = document.createElement('div');
  container.className = `dropdown position-relative ${className}`.trim();

  // Input group wrapper
  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';

  // Text input
  const input = document.createElement('input');
  input.className = 'form-control';
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('autocomplete', 'on');

  // Dropdown menu
  const menu = document.createElement('div');
  menu.className = 'dropdown-menu w-100 shadow';

  // Render dropdown items
  const renderOptions = (filter = '') => {
    menu.innerHTML = '';
    const filtered = options.filter(opt =>
      opt.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(opt => {
      const item = document.createElement('button');
      item.className = 'dropdown-item';
      item.type = 'button';
      item.textContent = opt;
      item.onclick = () => {
        input.value = opt;
        console.log('on click')
        validateInput();
        menu.classList.remove('show');
      };
      menu.appendChild(item);
    });

    if (filtered.length === 0) {
      const noItem = document.createElement('div');
      noItem.className = 'dropdown-item disabled';
      noItem.textContent = 'No match';
      menu.appendChild(noItem);
    }
  };

  // Validate input value against options
  const validateInput = () => {
    const isValid = options.includes(input.value);
    if(input.value.length === 0){
      input.classList.remove('is-invalid');
    }
    else {
      input.classList.toggle('is-valid', isValid);
      input.classList.toggle('is-invalid', !isValid);
    }
    if (isValid) {
      onValidSelect(input.value);
    }
  };
  // Event listeners
  input.addEventListener('input', () => {
    renderOptions(input.value);
    menu.classList.add('show');
  });

  input.addEventListener('focus', () => {
    renderOptions(input.value);
    menu.classList.add('show');
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      menu.classList.remove('show');
      validateInput();
    }, 150);
  });

  // Build DOM structure
  inputGroup.appendChild(input);
  container.appendChild(inputGroup);
  container.appendChild(menu);

  return container;
}
