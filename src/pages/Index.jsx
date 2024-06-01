import React, { useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, HStack, VStack, Select } from "@chakra-ui/react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const data = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
  { id: 3, name: "Sam Green", age: 45, email: "sam@example.com" },
  { id: 4, name: "Alice Brown", age: 23, email: "alice@example.com" },
  { id: 5, name: "Bob White", age: 30, email: "bob@example.com" },
  { id: 6, name: "Charlie Black", age: 29, email: "charlie@example.com" },
  { id: 7, name: "David Blue", age: 40, email: "david@example.com" },
  { id: 8, name: "Eve Red", age: 35, email: "eve@example.com" },
  { id: 9, name: "Frank Yellow", age: 50, email: "frank@example.com" },
  { id: 10, name: "Grace Pink", age: 27, email: "grace@example.com" },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={4}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>
                <HStack>
                  <span>ID</span>
                  <IconButton aria-label="Sort ID" icon={sortConfig.key === "id" ? sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown /> : <FaSort />} size="xs" onClick={() => handleSort("id")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Name</span>
                  <IconButton aria-label="Sort Name" icon={sortConfig.key === "name" ? sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown /> : <FaSort />} size="xs" onClick={() => handleSort("name")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Age</span>
                  <IconButton aria-label="Sort Age" icon={sortConfig.key === "age" ? sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown /> : <FaSort />} size="xs" onClick={() => handleSort("age")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Email</span>
                  <IconButton aria-label="Sort Email" icon={sortConfig.key === "email" ? sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown /> : <FaSort />} size="xs" onClick={() => handleSort("email")} />
                </HStack>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.age}</Td>
                <Td>{item.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack spacing={2}>
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
