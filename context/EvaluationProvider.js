import React from "react";

const EvaluationContext = React.createContext();

export const EvaluationComsumer = EvaluationContext.Consumer;

export function EvaluationConnect(params = []) {
  return function EvaluationConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <EvaluationComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </EvaluationComsumer>
      );
    };
  };
}

export class EvaluationProvider extends React.Component {
  state = {
    evaluations: null
  };

  setEvaluations = evaluations => this.setState({ evaluations });

  getEvaluations = () => this.state.evaluations;

  render() {
    return (
      <EvaluationContext.Provider
        value={{
          evaluations: this.state.evaluations,
          setEvaluations: this.setEvaluations,
          getEvaluations: this.getEvaluations
        }}
      >
        {this.props.children}
      </EvaluationContext.Provider>
    );
  }
}
