
# @precooked/react-dynamic-list

![Precooked Logo](https://precookedcode.com/assets/logos/logo-horizontal-dark.svg)

A flexible and reusable React component for displaying and managing dynamic lists with optional sortable functionality. Built on top of `@precooked/react-sortable`.

---

## Installation

Install the package using npm or yarn:

```bash
npm install @precooked/react-dynamic-list
# or
yarn add @precooked/react-dynamic-list
```

---

## Features

- Render dynamic lists with customizable start and end cells.
- Supports sortable functionality using drag handles (`SortableHandle`).
- Integrates seamlessly with `@precooked/react-sortable`.

---

## Props

### `DynamicListProps`
| Prop              | Type                                         | Description                                                                                     | Default      |
|-------------------|----------------------------------------------|-------------------------------------------------------------------------------------------------|--------------|
| `className`       | `string`                                    | Optional CSS class for the container.                                                          | `null`       |
| `containerStyle`  | `React.CSSProperties`                       | Inline styles for the container.                                                               | `null`       |
| `itemStyle`       | `React.CSSProperties`                       | Inline styles for individual items.                                                            | `null`       |
| `startCells`      | `Array<{ type: string; name: string; props?: Record<string, any> }>` | Defines the cells to render at the start of each item.                                         | `[]`         |
| `endCells`        | `Array<{ type: string; name: string; props?: Record<string, any> }>` | Defines the cells to render at the end of each item.                                           | `[]`         |
| `data`            | `any[]`                                     | The array of data to render in the list.                                                       | `[]`         |
| `isSortable`      | `boolean`                                   | Enables sortable functionality when `true`.                                                    | `false`      |
| `onOrderChange`   | `(newOrder: any[]) => void`                 | Callback called with the new order of items after sorting.                                     | `null`       |

---

## Usage Examples

### Example 1: Non-Sortable List

```tsx
import React from 'react';
import DynamicList from '@precooked/react-dynamic-list';

const Example = () => {
    const data = [
        { id: 1, name: 'Item 1', value: 'Value 1' },
        { id: 2, name: 'Item 2', value: 'Value 2' },
    ];

    const startCells = [{ type: 'text', name: 'name' }];
    const endCells = [{ type: 'text', name: 'value' }];

    return (
        <DynamicList
            data={data}
            startCells={startCells}
            endCells={endCells}
            containerStyle={{ padding: 10 }}
            itemStyle={{ border: '1px solid #ccc', margin: '5px 0', padding: 10 }}
        />
    );
};

export default Example;
```

---

### Example 2: Sortable List with Drag Handle

```tsx
import React, { useState } from 'react';
import DynamicList from '@precooked/react-dynamic-list';

const Example = () => {
    const [data, setData] = useState([
        { id: 1, name: 'Item 1', value: 'Value 1' },
        { id: 2, name: 'Item 2', value: 'Value 2' },
    ]);

    const handleOrderChange = (newOrder) => {
        setData(newOrder);
    };

    const startCells = [{ type: 'text', name: 'name' }];
    const endCells = [{ type: 'text', name: 'value' }];

    return (
        <DynamicList
            data={data}
            startCells={startCells}
            endCells={endCells}
            isSortable={true}
            onOrderChange={handleOrderChange}
            containerStyle={{ padding: 10 }}
            itemStyle={{ border: '1px solid #ccc', margin: '5px 0', padding: 10 }}
        />
    );
};

export default Example;
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
