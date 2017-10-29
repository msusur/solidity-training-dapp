$(function() {
  var activeDude,
    isEthActive = typeof web3 !== 'undefined';

  $('.faq-item').click(function() {
    if (activeDude) {
      activeDude.hide();
    }
    var key = $(this).attr('for');
    activeDude = $('#' + key).toggle();
  });

  var loadEthInformation = function(w3, address) {
    w3.version.getNetwork(function(err, netId) {
      // Get network id.
      if (netId !== '4') {
        $('#metamask-alert').text('Sadece Rinkeby ile bu siteyi kullanabilirsiniz!').show();
        throw new Error('Not Rinkeby.');
      }

      // Get contract ABI.
      $.get('/lib/contract-abi.json').then(function(abi) {
        var contract = w3.eth.contract(abi).at(address);
        var batch = w3.createBatch();

        batch.add(w3.eth.getBalance.request(address, 'latest', function(b) {
          $('#balance').text(b || 0);
        }));
        batch.add(contract.getTotalCount.request(function(b) {
          debugger;
        }));
        // batch.add(w3.eth.getBalance.request(address, 'latest', function(b) {
        //   $('#balance').text(b || 0);
        // }));
        // batch.add(web3.eth.contract(abi).at(address).balance.request(address, function() {
        //   debugger;
        // }));

        batch.execute();
        // debugger;
        // var count = contract.getTotalCount.call().then(function() { debugger; });
        // var limit = contract.getStudentLimit.call();
        // debugger;
        // $('#studentCount').text(count);
        // $('#studentLimit').text(limit);
      });
    });
  };

  if (isEthActive) {
    $('#metamask-alert').hide();
    loadEthInformation(new Web3(web3.currentProvider), '0xbf882a14ef48d1ab38df3efc1080edd3e8552234');
  } else {
    $('.eth-info').remove();
  }
});