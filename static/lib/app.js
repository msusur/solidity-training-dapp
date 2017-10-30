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

        $('#btn').click(function() {
          var email = $('#email').val();
          var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (!re.test(email)) {
            return $('#metamask-alert').text('Email adresi gecersiz.').show();
          }
          contract.StudentRegistered(function(error, result) {
            if (error) {
              return $('#metamask-alert').text('Bir hata olustu: ' + error).show();
            }
            $('#information-alert')
              .html('Kaydiniz alindi.')
              .show();
          });

          contract.registerToEvent.sendTransaction(email, { gas: 4700000, gasPrice: 80000000000 },
            function(error, result) {
              $('#information-alert')
                .html('İşleminiz alındı. Detaylar için buraya tıklayın ' +
                  '<a href="https://rinkeby.etherscan.io/tx/' + result + '" target="_blank">' + result + '</a>.')
                .show();
            });
        });

        var contract = w3.eth.contract(abi).at(address);

        var batch = w3.createBatch();
        batch.add(contract.getTotalCount.call(function(error, result) {
          $('#studentCount').text(result);
        }));
        batch.add(contract.getStudentLimit.call(function(error, result) {
          $('#studentLimit').text(result);
        }));
        batch.execute();
      });
    });
  };

  var contractAddress = '0x4dfb91dc32e46f85e14ffca9c6da371304e4874f';
  $('#smartContract').attr('href', 'https://rinkeby.etherscan.io/address/' + contractAddress).text(contractAddress);

  if (isEthActive) {
    $('#metamask-alert').hide();
    loadEthInformation(new Web3(web3.currentProvider), contractAddress);
  } else {
    $('.eth-info').remove();
  }
});