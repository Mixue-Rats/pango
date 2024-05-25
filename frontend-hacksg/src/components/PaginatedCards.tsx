import React, { useState } from 'react';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import LongCard from './LongCard';  // Assuming LongCard is in the same directory

const PaginatedCards = ({ events }: { events: any[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate number of pages
    const pageCount = Math.ceil(events.length / itemsPerPage);

    // Load current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageItems = events.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <Row>
                {currentPageItems.map(event => (
                    <Col key={event.id} sm={12} md={6} lg={4}>
                        <LongCard {...event} />
                    </Col>
                ))}
            </Row>
            <Pagination className="justify-content-center">
                {Array.from(Array(pageCount).keys()).map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default PaginatedCards;
