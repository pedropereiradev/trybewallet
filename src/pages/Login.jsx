import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';
import ilustration from '../assets/ilustration-logo.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.validateData = this.validateData.bind(this);
    this.saveData = this.saveData.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validateData({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;

      const MIN_PASSWORD_LENGTH = 6;
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

      const checkValidate = email.match(emailRegex)
        && (password.length >= MIN_PASSWORD_LENGTH);

      this.setState({ isDisabled: !checkValidate });
    });
  }

  saveData() {
    const { email } = this.state;
    const { dispatch, history } = this.props;

    dispatch(loginAction(email));
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div
        className="vh-100 d-flex flex-column align-items-center
        justify-content-center bg-light"
      >
        <section
          className="bg-white border border-light rounded p-5 shadow"
        >
          <img
            src={ ilustration }
            alt="Woman doing bitcoin trading Illustration by Lihin Souw on IconScout"
          />
          <h2 className="d-flex justify-content-center text-monospace">TRYBEWALLET</h2>
          <section
            className="d-flex flex-column"
          >
            <input
              type="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={ email }
              onChange={ this.validateData }
              data-testid="email-input"
              className="mb-2 mt-4 form-control"
            />
            <input
              type="password"
              name="password"
              placeholder="Digita a senha"
              value={ password }
              onChange={ this.validateData }
              data-testid="password-input"
              className="mb-4 form-control"
            />
          </section>
          <section className="d-flex justify-content-center">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.saveData }
              className="btn btn-primary w-75 py-2"
            >
              Entrar
            </button>
          </section>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
