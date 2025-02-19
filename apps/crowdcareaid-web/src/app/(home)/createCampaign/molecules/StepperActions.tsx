import { Button, useStepper } from '@crowdcareaid-frontend/next-components';
import { useFormContext } from 'react-hook-form';
import { steps } from './data';

interface StepperFormActionsProps {
  onSubmit?: () => void;
  loading?: boolean;
}

export function StepperFormActions({
  onSubmit,
  loading,
}: StepperFormActionsProps) {
  const { nextStep, activeStep, prevStep } = useStepper();
  const { trigger } = useFormContext();

  const nextValidStep = async () => {
    const fields = steps[activeStep]?.fields || [];
    const isValid = await trigger(fields);

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="w-full flex justify-end gap-2">
      <div className="w-full flex flex-row space-x-5 justify-end items-center">
        {activeStep > 0 && (
          <Button
            onClick={prevStep}
            size="sm"
            variant="secondary"
            type="button"
            className="w-1/2 h-16 border-2 bg-white border-brownOrange rounded-lg text-brownOrange font-medium text-xl"
          >
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            size="sm"
            type="submit"
            className="w-1/2 h-16 bg-brownOrange rounded-lg text-white font-medium text-xl"
            onClick={onSubmit}
            isLoading={loading}
          >
            Create
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            className="w-1/2 h-16 bg-brownOrange rounded-lg text-white font-medium text-xl"
            onClick={nextValidStep}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
