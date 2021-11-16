interface Item {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => void;
}

export default Item;
