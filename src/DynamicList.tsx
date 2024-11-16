import React, { useState } from 'react';
import { Icon } from '@precooked/react-icon';
import { SortableContainer, SortableHandle } from '@precooked/react-sortable';
import { TextCell } from '@precooked/react-text-cell';

interface DynamicListProps {
    className?: string;
    containerStyle?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    startCells?: Array<{ type: string; name: string; props?: Record<string, any> }>;
    endCells?: Array<{ type: string; name: string; props?: Record<string, any> }>;
    data: any[];
    apiBaseUrl?: string;
    endpoint?: string;
    displayMode?: 'row' | 'grid';
    noContentText?: string;
    noContentIcon?: string;
    itemActions?: Array<any>;
    moreItemActions?: Array<any>;
    forceRefresh?: boolean;
    isSortable?: boolean;
    onOrderChange?: (newOrder: any[]) => void;
}

const DynamicList: React.FC<DynamicListProps> = ({
    className,
    containerStyle,
    itemStyle,
    startCells = [],
    endCells = [],
    data = [],
    isSortable = false,

    onOrderChange,
}) => {
    const [items, setItems] = useState(data);

    // Maneja el cambio de orden
    const handleSortEnd = (newOrder: any[]) => {
        setItems(newOrder);
        if (onOrderChange) {
            onOrderChange(newOrder);
        }
    };

    // Función para resolver el componente de celda según el tipo
    const resolveCellComponent: any = (type: string) => {
        switch (type) {
            case 'text':
                return TextCell;
            default:
                throw new Error(`Unknown cell type: ${type}`);
        }
    };

    // Renderizamos los items de la lista
    const renderItem = (item: any, index: number) => (
        <div
            key={`item-${item.id}`}
            style={{ display: 'flex', alignItems: 'center', ...itemStyle }}
            className="dynamic-list-item"
        >
            {isSortable && (
                <SortableHandle>
                    <Icon name="drag" />
                </SortableHandle>
            )}
            <div style={{ flex: 1 }}>
                {startCells.map((cell, cellIndex) => {
                    const CellComponent = resolveCellComponent(cell.type);
                    return (
                        <CellComponent
                            key={cellIndex}
                            value={item[cell.name]}
                            {...cell.props}
                        />
                    );
                })}
            </div>
            <div style={{ flex: 1 }}>
                {endCells.map((cell, cellIndex) => {
                    const CellComponent = resolveCellComponent(cell.type);
                    return (
                        <CellComponent
                            key={cellIndex}
                            value={item[cell.name]}
                            {...cell.props}
                        />
                    );
                })}
            </div>
        </div>
    );

    return isSortable ? (

        <SortableContainer
            items={items}
            onSortEnd={handleSortEnd}
            renderItem={renderItem}
            useDragHandle={true}
        />


    ) : (
        <div style={containerStyle} className={className}>
            {items.map((item, index) => renderItem(item, index))}
        </div>
    );
};

export default DynamicList;
