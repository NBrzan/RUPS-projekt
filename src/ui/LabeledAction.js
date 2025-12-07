class LabeledAction {
  constructor(label, onClick, submenu = null) {
    this.label = label;
    this.onClick = onClick;
    this.submenu = submenu;
  }
}
export { LabeledAction };