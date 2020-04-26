import React from "react";
//necessario import para definir as propriedades
import PropTypes from "prop-types";

export default function TextIput(props) {
  //valida o erro e coloca a classe caso tenha algums (praticamente um concatena erro)
  let wrapperClass = "form-group";

  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          onChange={props.onChange}
          name={props.name}
          className="form-control"
          value={props.value}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

//define o valor defaul do erro quando inicia o componente
TextIput.defaultProps = {
  error: "",
};
//fala como e o tipo das props recebidas e se são obrigatorias
TextIput.protTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};
