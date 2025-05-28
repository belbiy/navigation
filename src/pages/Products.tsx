import { Heading, Content, Grid, View, Text } from '@adobe/react-spectrum'

function Products() {
  return (
    <div>
      <Heading level={1}>Products</Heading>
      <Content>
        <p>Browse our collection of products.</p>
      </Content>
      <Grid columns="repeat(3, 1fr)" gap="size-200" marginTop="size-300">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View
            key={item}
            backgroundColor="gray-75"
            padding="size-200"
            borderRadius="medium"
          >
            <Heading level={3}>Product {item}</Heading>
            <Text>Description for product {item}</Text>
          </View>
        ))}
      </Grid>
    </div>
  )
}

export default Products 