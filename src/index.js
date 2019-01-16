import 'wijmo/styles/wijmo-core.scss';
import 'wijmo/cultures/wijmo.culture.ja';
import * as wjGrid from 'wijmo/wijmo.grid';
import * as wjCore from 'wijmo/wijmo';

var cv = new wjCore.CollectionView();
cv.trackChanges = true;

var flexGrid = new wjGrid.FlexGrid('#flexGrid',{
  itemsSource: cv,
  allowAddNew: true,
  allowDelete: true
});

var url = 'https://localhost:44362/api/Products';

//GET
wjCore.httpRequest(url, {
    success: function (xhr) {
      cv.sourceCollection = JSON.parse(xhr.response);
    }
});

document.getElementById('update').addEventListener('click', function () {
  //PUT
  for (var i = 0; i < cv.itemsEdited.length; i++) {
    wjCore.httpRequest(url + cv.itemsEdited[i].productId, {
      method: 'PUT',
      data: cv.itemsEdited[i]
    });
  }

  //POST
  for (var i = 0; i < cv.itemsAdded.length; i++) {
    wjCore.httpRequest(url, {
      method: 'POST',
      data: cv.itemsAdded[i]
    });
  }

  // DELETE
  for (var i = 0; i < cv.itemsRemoved.length; i++) {
    wijmo.httpRequest(url + cv.itemsRemoved[i].productId, {
      method: 'DELETE'
    });
  }
});

