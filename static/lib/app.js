$(function() {
  var activeDude,
    isEthActive = typeof web3 !== 'undefined',
    studentCount = 0,
    contractAddress = '0xC673F53493e0c21eF25B738f009945D8a12621C0';

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
                  '<a href="https://rinkeby.etherscan.io/tx/' + result + '" target="_blank">' + result + '</a>. <br/>Eğer transaction başarılı görünüyorsa kaydınız alınmıştır. Lütfen mail beklemeyin.')
                .show();
            });
        });

        $('#adminButton').click(function() {
          var queue = w3.createBatch();
          // admin button to list the students.
          for (var idx = 0; idx < studentCount; idx += 1) {
            queue.add(function(id) {
              return contract.getStudent.call(id, function(error, result) {
                if (error) {
                  return console.log('Yok canim daha neler...');
                }
                if (result[1]) {
                  $('.super-secret-admin-stuff').show().append('<p>' + id + '.' + result[1] + '</p>');
                }
              });
            }(idx));
          }

          queue.execute();

        });
        var contract = w3.eth.contract(abi).at(address);

        var batch = w3.createBatch();
        batch.add(contract.getTotalCount.call(function(error, result) {
          $('#studentCount').text(result);
        }));
        batch.add(contract.getStudentLimit.call(function(error, result) {
          studentCount = result.c;
          $('#studentLimit').text(studentCount);
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