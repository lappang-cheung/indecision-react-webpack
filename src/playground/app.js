class IndecisionApp extends React.Component{

  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state= {
      options: props.options
    }
  }

  componentDidMount(){

    try{
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      
      if(options){
        this.setState(() => ({options}));
      }
    }catch(e){
      // Nothing needed to be done 
    } 
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  // Removal All Items
  handleDeleteOptions(){
    this.setState(() => {
      return {
        options: []
      }
    });
  }

  // Remove Individual Item
  handleDeleteOption(optionToRemove){
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }

  // Random Choose An Item
  handlePick(){
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  // Adding A Single Item
  handleAddOption(option){

    if(!option){
      return 'Enter a valid value to add item';
    }else if (this.state.options.indexOf(option) > -1){
      return 'This option already exists';
    }

    this.setState((prevState) => {
      return{
        options: prevState.options.concat(option)
      };
    });
  }

  // Rendering the template
  render(){
    const title = 'Indecision App';
    const subTitle = 'Put your life in the hands of the computer';
    
    return (
      <div>
        <Header title = {title} subTitle = {subTitle}/>
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick = {this.handlePick}
        />
        <Options 
          options = {this.state.options}
          handleDeleteOptions = {this.handleDeleteOptions}
          handleDeleteOption = {this.handleDeleteOption}
        />
        <AddOption
          handleAddOption = {this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

// Header Component
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  );
}

// Choose what needs to be done
const Action = (props) => {
  return(
    <div>
      <button onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What Should I Do?
      </button>
    </div>
  );
}

// Options Array Component
const Options = (props) => {
  return(
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to start</p>}
      <ol>
        {
          props.options.map((option) => {
            return <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>
          })
        }
      </ol>
    </div>
  );
}

// Option Rendering in Options List
const Option = (props) => {
  return(
    <div>
      <li>{props.optionText}</li>
      <button 
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >Remove</button>
    </div>
  );
}

// Adding Options to Options List
class AddOption extends React.Component{
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e){
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return{
        error: error
      };
    });

    if(!error){
      e.target.elements.option.value = '';
    }
    
  }

  render(){
    return(
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}


// Templating for the Indecision App
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));