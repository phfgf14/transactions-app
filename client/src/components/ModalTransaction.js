import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 1,
  },
};

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const {
    _id: id,
    description,
    category,
    value,
    yearMonthDay,
    type,
  } = selectedTransaction;

  const [currentType, setCurrentType] = React.useState(type);
  const [currentDescription, setCurrentDescription] = React.useState(
    description
  );
  const [currentCategory, setCurrentCategory] = React.useState(category);
  const [currentValue, setCurrentValue] = React.useState(value);
  const [currentData, setCurrentData] = React.useState(yearMonthDay);

  /**
   * Evento para monitorar a tecla Esc, através de keydown
   */
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Eliminando evento
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  /**
   * Cercando a tecla "Esc"
   * e fechando a modal caso
   * seja digitada
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      _id: id,
      type: currentType,
      description: currentDescription,
      category: currentCategory,
      value: currentValue,
      yearMonthDay: currentData,
    };
    onSave(formData);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleTypeChange = (event) => {
    setCurrentType(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setCurrentDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };
  const handleValueChange = (event) => {
    setCurrentValue(event.target.value);
  };
  const handleDataChange = (event) => {
    setCurrentData(event.target.value);
  };

  return (
    <div>
      <Modal style={customStyles} isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Edição de Lançamentos</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              <input
                name="group1"
                type="radio"
                value="-"
                checked={currentType === '-'}
                onChange={handleTypeChange}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="group1"
                type="radio"
                value="+"
                checked={currentType === '+'}
                onChange={handleTypeChange}
              />
              <span>Receita</span>
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={currentDescription}
              onChange={handleDescriptionChange}
              autoFocus
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={currentCategory}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              min="0"
              value={currentValue}
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputData"
              type="date"
              className="datepicker"
              value={currentData}
              onChange={handleDataChange}
            />
            <label className="active" htmlFor="inputData">
              Data:
            </label>
          </div>

          <div style={styles.flexRow}>
            <button className="waves-effect waves-light btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
