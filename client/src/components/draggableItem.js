import React, { Component } from 'react';

export default class DraggableItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isDragging: false,
      mouseX: 0,
      mouseY: 0,
    };
  }

  onMouseDown = (event) => {
    const {
      clientX,
      clientY,
    } = event;
    this.setState({ //arrow를 사이드바에서 그냥 눌렀을 때 아무 반응이 없어야 함. 드래그해서 칸에 넣어야만 생김.
      outOfSidebarZone: false,
      isDragging: true,
      mouseX: clientX,
      mouseY: clientY,
    });
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (event) => {
    this.setState({
      isDragging: false,
    });
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    if (this.outOfSidebarZone && this.state.x !== 0 && this.state.x !== 0) {
      this.props.onMouseUp(event);
    }
    this.setState({
      x: 0,
      y: 0,
    });
  }

  onMouseMove = (event) => {
    const {
      clientX,
      clientY,
    } = event;
    const {
      mouseX,
      mouseY,
    } = this.state;
    const x = clientX - mouseX;
    const y = clientY - mouseY;

    console.log("this is X : ", x, "this is Y : ", y);
    (x < -170 && x > -1000 && y > 5)
      ? this.outOfSidebarZone = true
      : this.outOfSidebarZone = false;

    this.setState({
      x: x,
      y: y,
    });
  }

  render() {
    const {
      x,
      y,
      isDragging,
    } = this.state;
    const style = isDragging ? {transform: 'translate(' + x + 'px, ' + y + 'px)'} : {};
    const className = isDragging ? "custom-item" : "";
    const newItemSidebarOption = isDragging ? "newItemSidebarMoving" : "newItemSidebar";

    return (
      <div className={className} onMouseDown={this.onMouseDown} style={style}>
        <div className={newItemSidebarOption}>
          newItem
        </div>
      </div>
    );
  }
}
