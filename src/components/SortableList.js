import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import Search from '../components/Search'
import { sortList } from '../actions/listActions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  padding: 4,
  // margin: `0 0 ${grid}px 0`,
  background: '#4F5C63',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#00AAE2' : '#4F5C63',
});


class SortableList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      items: props.list,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({ items: nextProps.list})
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      items,
    }, () => this.handleReorder());

    // console.log("reordered! about to call action")
    // this.props.sortList(items, 'reorder', this.props.currentList)
  }

  handleSort = (e) => {
    this.props.sortList(this.props.list, e.target.id, this.props.currentList)
  }

  handleReorder = () => {
    this.props.sortList(this.state.items, 'reorder', this.props.currentList)
  }

  render() {
    return(
      <div id="list-items-container">
        <Search />
        <div id="sort-button-container">
          {(this.props.currentList === 'seen') ?
            <button className="sort-button" id='rating' onClick={this.handleSort}>rating</button>
            : null}
            <button className="sort-button" id='dateAdded' onClick={this.handleSort}>date added</button>
            <button className="sort-button" id='title' onClick={this.handleSort}>title</button>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  >
                  {this.state.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          >
                          <ListItem item={item} key={item.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      currentList: state.lists.currentList,
      next: state.lists.next,
      watching: state.lists.watching,
      seen: state.lists.seen,
    }
  }

  export default connect(mapStateToProps, { sortList })(SortableList)
