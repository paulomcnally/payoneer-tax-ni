import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const initialState = {
    bankTax: 0,
    value: 0,
  };
  const { register, handleSubmit, errors } = useForm();
  const payoneerTax = 3.15;
  const bankTaxPercentage = 1.8;

  function reducer(state, action) {
    switch (action.type) {
      case 'calculate':
        const bankTax = (bankTaxPercentage * action.amount) / 100;
        const value = action.amount + bankTax + payoneerTax;
        return {
          bankTax,
          value,
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (data) => {
    dispatch({ type: 'calculate', amount: parseFloat(data.amount) });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div className="card">
            <div className="card-header">
              Calculadora de impuestos de Payoneer en Nicaragua
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="amount">Monto a retirar del ATM</label>
                  <input id="amount" name="amount" className="form-control form-control-lg" ref={register({ required: true, pattern: /^\d+(\.\d{1,2})?$/ })} />
                </div>
                {errors.amount && <div className="alert alert-danger" role="alert">Se espera un entero o decimal positivo.</div>}
                <button className="btn btn-info btn-lg btn-block" disabled={errors.amount} type="submit">Calcular</button>
              </form>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Entidad</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Payoneer</td>
                    <td>
                      $
                      {payoneerTax}
                    </td>
                  </tr>
                  <tr>
                    <td>Banco</td>
                    <td>
                      $
                      {state.bankTax}
                      {' '}
                      (
                      {bankTaxPercentage}
                      %)
                    </td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td>
                      $
                      {state.value}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
