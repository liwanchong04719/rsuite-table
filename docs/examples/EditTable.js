import React from 'react';
import { Table, Column, Cell, HeaderCell } from '../../src';
import fakeData from '../data/users';
import _ from 'lodash';


export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  return (
    <Cell {...props}>
      {rowData.status === 'EDIT' ? (
        <input
          className="input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : rowData[dataKey]}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props}>
      <a
        onClick={() => {
          onClick && onClick(rowData.id);
        }}
      >
        {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
      </a>
    </Cell>
  );
};

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fakeData.filter((item, index) => index < 20)
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditState = this.handleEditState.bind(this);
  }
  handleChange(id, key, value) {
    const { data } = this.state;
    const nextData = _.clone(data);
    nextData.find(item => item.id === id)[key] = value;
    this.setState({
      data: nextData
    });
  }
  handleEditState(id) {
    const { data } = this.state;
    const nextData = _.clone(data);
    const activeItem = nextData.find(item => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';

    this.setState({
      data: nextData
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Table
          height={400}
          data={data}
          isTree
          expand
          onTreeToggle={(isOpen, rowData) => {
            console.log(isOpen, rowData);
          }}
          renderTreeToggle={(icon, rowData) => {
            if (rowData.labelName === '手机') {
              return (<i className="icon icon-spin icon-spinner" />);
            }
            return icon;
          }}
        >

          <Column width={200} >
            <HeaderCell>First Name</HeaderCell>
            <EditCell dataKey="firstName" onChange={this.handleChange} />
          </Column>

          <Column width={200} >
            <HeaderCell>Last Name</HeaderCell>
            <EditCell dataKey="lastName" onChange={this.handleChange} />
          </Column>

          <Column width={300} >
            <HeaderCell>Email</HeaderCell>
            <EditCell dataKey="email" onChange={this.handleChange} />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" onClick={this.handleEditState} />
          </Column>

        </Table>
      </div>
    );
  }
}

export default EditTable;
