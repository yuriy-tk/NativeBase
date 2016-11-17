export default mapPropsToStyleNames = (styleNames, props) => {
  console.log('title');

  const keys = _.keys(props);
  const values = _.values(props);

  _.forEach(keys, (key, index) => {
    if(values[index])
      styleNames.push(key);
  })

  return styleNames;
}
