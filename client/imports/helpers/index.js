import {Template} from 'meteor/templating';

var helpers = {

  deselectMulti(){
    Session.set("selectedItems",{_sel : []});
  },
  deselectSingle(){
    Session.set("selectedItem",{_id : 0});
  },
  selectSingle(item){
    Session.set("selectedItem",item);
  },
  selectMulti(item){
    Session.set("selectedItems",item);
  },
  hover(item){
    Session.set("hoverItem",item);
  },
  unhover(item){
    Session.set("hoverItem",null);
  },
  toggleMulti(item){
    var f = Session.get("selectedItems");
    if (f[item._id]!=null){
      for (var i=0;i<f._sel.length;i++){
        if (f._sel[i] == item._id){
          f._sel.splice(i,1);
        }
        delete f[item._id];
      }
    }
    else{
      f[item._id]=item._id;
      f._sel.push(item._id);
    }
    this.selectMulti(f);
  }
}
export const Helpers = helpers;
