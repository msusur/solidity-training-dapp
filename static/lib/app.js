$(function() {
  var activeDude,
    isEthActive = typeof web3 !== 'undefined',
    contractAddress = '0xaef70b0d7da2654b0f73285854d0e694b6a7d8bd';

  // Set contract address on FAQ
  $('#smartContract').attr('href', 'https://rinkeby.etherscan.io/address/' + contractAddress).text(contractAddress);

  // FAQ items open/close
  $('.faq-item').click(function() {
    if (activeDude) {
      activeDude.hide();
    }
    var key = $(this).attr('for');
    activeDude = $('#' + key).toggle();
  });

  var loadEthInformation = function(w3, address) {
    // Check the network
    w3.version.getNetwork(function(err, netId) {
      // Get network id
      if (netId !== '4') {
        $('#metamask-alert').text('Sadece Rinkeby ile bu siteyi kullanabilirsiniz!').show();
        throw new Error('Not Rinkeby.');
      }

      // Get contract ABI.
      $.get('/lib/contract-abi.json').then(function(abi) {

        // Registration button
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
              .html('Kayıt işleminiz tamamlandı. Bizden haber bekleyin!')
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


  if (isEthActive) {
    $('#metamask-alert').hide();
    loadEthInformation(new Web3(web3.currentProvider), contractAddress);
  } else {
    $('.eth-info').remove();
  }
});