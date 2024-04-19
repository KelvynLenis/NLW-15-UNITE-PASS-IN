using Microsoft.EntityFrameworkCore;
using PassIn.Communication.Responses;
using PassIn.Exceptions;
using PassIn.Infrastructure;

namespace PassIn.Application.UseCases.Attendees.GetAllByEventId;

public class GetAllAttendeeByEventIdUseCase
{
    private readonly PassInDbContext _dbContext;
    public GetAllAttendeeByEventIdUseCase()
    {
        _dbContext = new PassInDbContext();
    }
    public ResponseAllAttendeesjson Execute(Guid eventId)
    {
        var entity = _dbContext.Events.Include(ev => ev.Attendes).ThenInclude(attendee => attendee.CheckIn).FirstOrDefault(ev => ev.Id == eventId);

        if (entity is null)
            throw new NotFoundException("An event with this id doesn't exist.");

        return new ResponseAllAttendeesjson
        {
            Attendees = entity.Attendes.Select(attendee => new ResponseAttendeeJson
            {
                Id = attendee.Id,
                Name = attendee.Name,
                Email = attendee.Email,
                CreatedAt = attendee.Created_At,
                CheckedInAt = attendee.CheckIn?.Created_at
            }).ToList()
        };
    }
}
