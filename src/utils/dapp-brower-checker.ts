export default function checkDappBrower() {
  if (typeof ethereum !== 'undefined') {
    return true;
  } else if (typeof web3 !== 'undefined') {
    return true;
  } else {
    return false;
  }
}
