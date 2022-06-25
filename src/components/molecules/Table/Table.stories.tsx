import { AnchorText } from "@/components/atoms/AnchorText";
import { ComponentStoryObj } from "@storybook/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "./Table";

type T = typeof Table;
type Story = ComponentStoryObj<T>;

const TableStory = () => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>名前</Th>
          <Th>価格</Th>
          <Th>詳細</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr aria-label="row1">
          <Td aria-label="name">雑誌</Td>
          <Td aria-label="price">2000</Td>
          <Td aria-label="learnmore">
            <AnchorText hasArrow href="/products/1">
              詳細ページ
            </AnchorText>
          </Td>
        </Tr>
        <Tr aria-label="row2">
          <Td aria-label="name">書籍</Td>
          <Td aria-label="price">2000</Td>
          <Td aria-label="learnmore">
            <AnchorText hasArrow href="/products/2">
              詳細ページ
            </AnchorText>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default {
  component: TableStory,
};

export const Default: Story = {};
