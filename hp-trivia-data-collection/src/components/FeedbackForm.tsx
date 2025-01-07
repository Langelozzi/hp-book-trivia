import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, FormLabel, Typography, Grid2, Button } from '@mui/material';
import { Question } from '../interfaces/question';

interface FormData {
    difficulty: number;
    book: number;
    duplicate: boolean;
    flag: boolean;
}

interface FeedbackFormProps {
    q: Question,
    onSubmit: (data: any) => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ q, onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        difficulty: 1,
        book: 0,
        duplicate: false,
        flag: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            // Convert the value to a number before updating state
            setFormData({
                ...formData,
                [name]: name === 'difficulty' || name === 'book' ? parseInt(value, 10) : value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    useEffect(() => {
        setFormData({
            difficulty: q.difficulty ?? 1,
            book: q.book ?? 0,
            duplicate: q.duplicate,
            flag: q.flag
        });
    }, [q]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Feedback
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2}>
                        {/* Difficulty Radio Button */}
                        <Grid2 size={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Difficulty</FormLabel>
                                <RadioGroup
                                    row
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FormControlLabel
                                            key={value}
                                            value={value}
                                            control={<Radio />}
                                            label={String(value)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid2>

                        {/* Book Radio Button */}
                        <Grid2 size={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Book</FormLabel>
                                <RadioGroup
                                    row
                                    name="book"
                                    value={formData.book}
                                    onChange={handleChange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                                        <FormControlLabel
                                            key={value}
                                            value={value}
                                            control={<Radio />}
                                            label={value === 0 ? 'General' : String(value)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid2>

                        {/* Duplicate Checkbox */}
                        <Grid2 size={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.duplicate}
                                        onChange={handleChange}
                                        name="duplicate"
                                    />
                                }
                                label="Duplicate"
                            />
                        </Grid2>

                        {/* Flag Question Checkbox */}
                        <Grid2 size={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.flag}
                                        onChange={handleChange}
                                        name="flag"
                                    />
                                }
                                label="Question is Problematic"
                            />
                        </Grid2>
                    </Grid2>

                    {/* Save Button */}
                    <Grid2 container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ width: '100%' }}>
                            Save
                        </Button>
                        <Typography variant='subtitle2' mt={2}>Once you have saved once, the question will be marked as "completed" but you can still make changes and save after it is "completed".</Typography>
                    </Grid2>
                </form>
            </CardContent>
        </Card>
    );
};

export default FeedbackForm;
